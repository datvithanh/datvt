// Exercise the real analytics component's initial render, effect, and next render without network access.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const source = fs.readFileSync('components/ui/ProductionAnalytics.tsx', 'utf8')
const javascript = ts.transpileModule(source, {compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const Fragment=Symbol('Fragment'),Script=Symbol('Script')
function run(environment,origin){
 const effects=[];let state=false
 const element=(type,props)=>({type,props})
 const context={exports:{},process:{env:{NODE_ENV:environment}},window:{location:{origin}},require(name){
  if(name==='react') return {useState:()=>[state,value=>{state=value}],useEffect:callback=>effects.push(callback)}
  if(name==='react/jsx-runtime')return {jsx:element,jsxs:element,Fragment}
  if(name==='next/script')return {default:Script}
  throw new Error(`Unexpected dependency ${name}`)
 }}
 vm.runInNewContext(javascript,context)
 assert.equal(context.exports.ProductionAnalytics(),null,'No tag may render during SSR or before origin check')
 effects.shift()()
 return context.exports.ProductionAnalytics()
}
const blocked=[['production','https://datvt.com'],['production','https://www.datvt.com'],['production','https://poetic-tapioca-bc92a4.netlify.app'],['development','https://mindtraining.cc'],['test','https://mindtraining.cc'],['production','http://127.0.0.1:8765'],['production','http://localhost:3000'],['production','http://[::1]:8765'],['production','https://deploy-preview-26--contemplativecrossfit.netlify.app'],['production','https://contemplativecrossfit.netlify.app'],['production','https://mindtraining.cc.example.org'],['production','http://mindtraining.cc'],['production','https://www.mindtraining.cc'],['production','https://mindtraining.cc:8443']]
for(const [environment,origin] of blocked)assert.equal(run(environment,origin),null,`${environment} ${origin}`)
const allowed=run('production','https://mindtraining.cc')
assert.equal(allowed.type,Fragment)
const [loader,init]=allowed.props.children
assert.equal(loader.type,Script)
assert.equal(loader.props.src,'https://www.googletagmanager.com/gtag/js?id=G-9FMFZFSPFB')
assert.equal(loader.props.strategy,'afterInteractive')
assert.equal(init.type,Script)
assert.equal(init.props.id,'gtag-init')
assert.equal(init.props.strategy,'afterInteractive')
const analyticsContext={window:{},Date};analyticsContext.dataLayer=analyticsContext.window.dataLayer=[]
vm.runInNewContext(init.props.children,analyticsContext)
assert.equal(analyticsContext.window.dataLayer.length,2)
assert.equal(analyticsContext.window.dataLayer[0][0],'js')
assert.equal(analyticsContext.window.dataLayer[1][0],'config')
assert.equal(analyticsContext.window.dataLayer[1][1],'G-9FMFZFSPFB')
console.log(`GA4: initial render blocked; ${blocked.length} development/local/preview/lookalike origins blocked; HTTPS canonical production emits the original loader and config. No network requests sent.`)
