// Exercise the actual production handler with mocked fetch; never sends a subscription.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const source = fs.readFileSync('components/ui/KitEmailForm.tsx', 'utf8')
const ast = ts.createSourceFile('KitEmailForm.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
let handler
function find(node) { if (ts.isFunctionDeclaration(node) && node.name?.text === 'handleSubmit') handler = node.getText(ast); ts.forEachChild(node, find) }
find(ast)
assert(handler, 'The shared Kit handler must remain present')
const defaultId = source.match(/const DEFAULT_FORM_ID = '([^']+)'/)[1]
assert.equal(defaultId, '9576210', 'The welcome-sequence form must be retained')
const javascript = ts.transpileModule(handler, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText
async function run({response = {ok:true, json:async()=>({status:'success'})}, reject=false, firstName='QA name', collectFirstName=true, status='idle'} = {}) {
  const states = [], calls = []
  let prevented = false
  const context = {status, setStatus:value=>states.push(value), formId:defaultId, email:'qa@example.invalid', firstName, collectFirstName, FormData,
    fetch:async(url,options)=> { calls.push({url,options,fields:[...options.body.entries()]}); if(reject) throw new Error('Mock network error'); return response }
  }
  const submit = vm.runInNewContext(`${javascript}\nhandleSubmit`, context)
  await submit({preventDefault(){prevented=true}})
  assert(prevented)
  return {states,calls}
}
;(async()=>{
  let result=await run()
  assert.deepEqual(result.states,['submitting','success'])
  assert.equal(result.calls[0].url,'https://app.kit.com/forms/9576210/subscriptions')
  assert.equal(result.calls[0].options.method,'POST')
  assert.equal(result.calls[0].options.headers.Accept,'application/json')
  assert.deepEqual(result.calls[0].fields,[['email_address','qa@example.invalid'],['fields[first_name]','QA name']])
  for(const options of [{firstName:''},{collectFirstName:false}]){
    result=await run(options);assert.deepEqual(result.calls[0].fields,[['email_address','qa@example.invalid']])
  }
  for(const options of [{response:{ok:false,json:async()=>({})}},{response:{ok:true,json:async()=>({status:'error'})}},{reject:true}]){
    result=await run(options);assert.deepEqual(result.states,['submitting','error'])
  }
  result=await run({response:{ok:true,json:async()=>{throw new Error('Mock non-JSON')}}})
  assert.deepEqual(result.states,['submitting','success'])
  result=await run({status:'submitting'})
  assert.deepEqual(result.calls,[]);assert.deepEqual(result.states,[])
  console.log('Kit: default welcome form, optional first name, payload, success, API error, network error, non-JSON and duplicate-submit guard pass. No network requests sent.')
})().catch(error=>{console.error(error);process.exitCode=1})
