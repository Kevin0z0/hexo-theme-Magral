const assert = require('assert');
const expect = require('expect.js')
const HTMLParse = require('../htmlParse')

function parseHTML(html){
  const result = new HTMLParse(html, 0).parse()
  return JSON.parse(JSON.stringify(result))
}

describe('HTMLParse', function () {
  it('Base test 1', function () {
    const html = `<div></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{},"type":"ElementNode","children":[]}
    )
  })

  it('Attr test 1', function () {
    const html = `<div class= "abc" ></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[]}
    )
  })

  it('Attr test 2', function () {
    const html = `<div class = "abc"></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[]}
    )
  })

  it('Attr test 3', function () {
    const html = `<div class = "abc" name = "111"> </div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc", "name": "111"},"type":"ElementNode","children":[]}
    )
  })

  it('Attr test 4', function () {
    const html = `<div class="abc" class="ccc" v-for="i in data">{{i}}</div>`
    expect(parseHTML(html)).to.eql(
        {"tag":"div","attr":{"class":["abc","ccc"],"v-for":"i in data"},"type":"ElementNode","children":[{"text":"{{i}}","type":"TextNode"}]}
    )
  })

  it('Text test 1', function () {
    const html = `<div class= "abc" >1</div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[{"text":"1","type":"TextNode"}]}
    )
  })

  it('MultiTag test 1', function () {
    const html = `<div class="abc"><span></span></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[{"tag":"span","attr":{},"type":"ElementNode","children":[]}]}
    )
  })

  it('MultiTag test 2', function () {
    const html = `<div class="abc"><span><i id = "asd"></i></span></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{"class":"abc"},"type":"ElementNode","children":[{"tag":"span","attr":{},"type":"ElementNode","children":[{"tag":"i","attr":{"id": "asd"},"type":"ElementNode","children":[]}]}]}
    )
  })
})

const ExpressionParse = require('../expressionParser')

describe("Expression Parser", function(){
  it('Base test 1', function () {
    const html = `<div></div>`
    expect(parseHTML(html)).to.eql(
      {"tag":"div","attr":{},"type":"ElementNode","children":[]}
    )
  })
})