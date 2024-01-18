// function readSkippingWs(text: string, i: number) {
//   while (true) {
//     if (i > text.length) {
//         throw Error("Unexpected EOF");
//     }
//     let b = text[i];
//     if (!containsWhitespace(b)) {
//       return text[i];
//     }
//     i++;
//   }
// }

// function containsWhitespace(str: string) {
//   return /\s/.test(str);
// }

// function yieldNextObj(text: string, atStart: boolean, i: number) {
//     if (!atStart) {
//         atStart = true;
//         if (readSkippingWs(text, i) === "[") {
//             let t = text;
//             let k = i;
//             let peek = readSkippingWs(t, k);
//             if (peek === "]") {
//                 return null;
//             } else {

//             }
//         }
//     }
// }

// export default function iterJsonArray() {
//   let at_start = false;
//   let i = 0;
// }

export default class Parser {
  private _text: string;
  private _i: number;
  constructor(text: string) {
    this._text = text;
    this._i = 1;
  }

  private readSkippingWs() {
    while (true) {
      if (this._text[this._i].trim() !== "") {
        return this._text[this._i];
      }
      this._i++;
    }
  }

  private readUntilEnd() {
    while (true) {
      if (this._text[this._i] === "}") {
        return this._text[this._i];
      }
      this._i++;
    }
  }

  private getObject() {
    let b = this.readSkippingWs();
    if (b === "{") {
      let og = this._i;
      console.log(og);
      this.readUntilEnd();
      this._i++;
      let t = this._text.slice(og, this._i);
      this._i = og;
      return t;
    } else if (b === "}") {
    }
  }

  public getPreview() {
    if (this._text[0] !== "[") {
      console.log("no open bracket for array");
      return null;
    }
    let h = this.getObject();
    if (!h) {
      return;
    }

    console.log(JSON.parse(h));
  }
}

/**
 * [
 * {"input": "ijgasdi", "output": "jifasdijofas"},
 * {"input": "ijgasdi", "output": "jifasdijofas"}
 * ]
 */
