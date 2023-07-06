# react-use-hubspot
HubSpot integration for react.


## Usage

[click here to see example for more details](https://github.com/skyhooks/react-use-hubspot/blob/main/example/src/App.tsx)

```ts
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

```

## Available options
All options are available based on the hubSpot configuration, [Click here to see what options are available](https://github.com/skyhooks/react-use-hubspot/blob/6faecb084f5c72e4d47c26517bbc56ddc2c9b32b/dist/src/useHubSpot.d.ts#L8)

[For more details](https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options)

# License

Copyright © 2023 Gihan Rangana(under the skyhooks org) Released under the MIT license.
