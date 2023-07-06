import useHubSpot from '@skyhooks/react-use-hubspot'
import './App.css'

function App() {

  const hubSpot = useHubSpot({
    portalId: import.meta.env.VITE_HS_PORTAL_ID,
    formId: import.meta.env.VITE_HS_FORM_ID,
  })

  return (
    <>
      <div>
        <hubSpot.element
          loader={<h2>Load...</h2>}
        />
      </div>
    </>
  )
}

export default App
