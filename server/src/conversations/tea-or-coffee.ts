export default {
  id: "tea-or-coffee",
  conversation: [
    { text: "Hello world!", type: "TEXT", id: "start", children: [
      { text: "Would you like to have tea or coffee?", type: "TEXT", id: "tea-or-coffee", children: [
        { option: { text: "Tea", id: "option-tea" }, text: "Would you prefer green or black tea?", type: "TEXT", id: "tea", children: [
          { option: { text: "Green", id: "option-green-tea"}, text: "Green tea is a great choice", type: "TEXT", id: "green-tea" },
          { option: { text: "Black", id: "option-black-tea" }, text: "Black tea is a great choice", type: "TEXT", id: "black-tea" }
        ]},
        { option: { text: "Coffee", id: "option-coffee" }, text: "Coffee is best", type: "TEXT", id: "coffee" }
      ]}
    ]}
  ]
};
