class Input {
  #inputString = "";
  constructor(str) {
    this.#inputString = str;
  }
  get() {
    return this.#inputString;
  }
  set(str) {
    this.#inputString = str;
  }
}


export default Input;
export {
  Input
}
