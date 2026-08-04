# z-was-this-helpful

The two-button feedback prompt at the foot of a page.

```html
<z-was-this-helpful page="/c/forms/z-input"></z-was-this-helpful>
```

```js
document.querySelector('z-was-this-helpful')
  .addEventListener('feedback', (e) => e.detail) // { isHelpful, comment, page }
```

**It reports and forgets.** Where the answer goes — analytics, an issue, a
webhook — is the host's decision. Baking a destination in would make the
element useless to anyone whose destination differs.

**"No" opens a comment field; "yes" does not.** A thumbs-down without a reason
is close to worthless — you learn that a page failed but not how — and a
thumbs-up rarely has more to say than itself. Asking everyone for prose lowers
the response rate on the answer that actually matters.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | string | — | passed straight back in the event, so one listener can serve every page |
| `question` | string | `Was this page helpful?` | the prompt |
| `comment-placeholder` | string | `What was missing or wrong?` | placeholder for the follow-up |
| `thanks-label` | string | `Thanks for the feedback.` | shown after sending |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `feedback` | `{ isHelpful, comment, page }` | fired once; `comment` is empty for a yes |
