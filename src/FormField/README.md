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

With length count:

> NOTE: when `children` is function (a.k.a. render prop), it receives `setLengthLeft` which
> can be called with `number`

```js
<Field
  label="Tweet"
  maxLength={140}
  >
  {({setLengthLeft}) =>
    <Input onChange={event => setLengthLeft(100 - event.target.value)}/>
  }
</Field>
```
