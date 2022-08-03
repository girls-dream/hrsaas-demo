export const imgErr = {
  inserted: function (el, { value }) {
    console.log(el)
    el.onerror = function () {
      el.src = value
    }
  },
}