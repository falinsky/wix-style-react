# `<Field/>`

Generic component to help build forms.

```js
<Field label="Your name" required>
  <Input value={yourState.name} onChange={yourHandler}/>
</Field>
```

With tooltip:

```js
<Field label="Phone number" info="Don't forget area code">
  <Input value={yourState.number} onChange={yourHandler}/>
</Field>
```

With char count:

> NOTE: set `value` and `onChange` directly on `Field`.

```js
<Field
  label="Tweet"
  maxLength={140}
  value={yourState.comment}
  onChange={yourHandler}
  >
  <Input />
</Field>
```

With char count, manual control:

```js
<Field
  label="Tweet"
  maxLength={140}
  valueLength={yourState.tweet.length}
  >
  <RichTextArea value={yourState.tweet} onChange={yourHandler} />
</Field>
```
