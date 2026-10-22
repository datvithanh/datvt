import { Offerings } from './Offerings'

export function ProgramsContent() {
  return <>
<section className="programs-overview wrap"><h1>Ways to<br /><em>train.</em></h1><p className="programs-overview-deck">Different levels of intensity. A shared seriousness about practice. Start where you can commit to doing the work.</p><Offerings details /><div className="programs-help"><p>Questions about the practice or the commitment?</p><a className="text-link" href="mailto:contact@mindtraining.cc">Talk with the team <span aria-hidden="true">↗</span></a></div></section>
  </>
}
