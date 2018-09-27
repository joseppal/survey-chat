export default {
  id: "tea-or-coffee",
  dialogue: [
    [
      {id: "1", text: "Hello!", type: "TEXT"},
      {id: "2", text: "Would you like to have tea or coffee?", type: "TEXT"},
      {id: "3", type: "OPTIONS", options: [
        {id: "4", goto: "6", text: "Tea"},
        {id: "5", goto: "10", text: "Coffee"}
      ]}
    ],
    [
      {id: "6", text: "Would you prefer green or black tea?", type: "TEXT"},
      {id: "7", type: "OPTIONS", options: [
        {id: "8", goto: "11", text: "Green"},
        {id: "9", goto: "15", text: "Black"}
      ]}
    ],
    [
      {id: "10", text: "Coffee is best", type: "TEXT"},
    ],
    [
      {id: "11", text: "Green tea is a great choice", type: "TEXT"},
      {id: "12", url: "/images/green-tea.png", type: "IMAGE", link: "https://en.wikipedia.org/wiki/Green_tea"},
      {id: "13", link: "https://en.wikipedia.org/wiki/Green_tea", text: "Button link", type: "LINK", style: "button", target: "_self"},
      {id: "14", link: "https://en.wikipedia.org/wiki/Green_tea", text: "Button link", type: "LINK", style: "link"}
    ],
    [
      {id: "15", text: "Black tea is a great choice", type: "TEXT"}
    ]
  ]
};
