import useHubSpot from 'react-use-hubspot'
import './App.css'


function App() {

  const hubSpot = useHubSpot({ portalId: "<PORTAL_ID_HERE>", formId: "FORM_ID_HERE", region: "na1" })

  return (
    <>
      <div>
        <hubSpot.element />
      </div>
    </>
  )
}

export default App
