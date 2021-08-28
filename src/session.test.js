const session = require("./session")

// @ponicode
describe("addEntry", () => {
    let inst

    beforeEach(() => {
        inst = new session({ name: "Michael", persistence: "UPDATE Projects SET pname = %s WHERE pid = %s" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.addEntry({ response: 429, requestTime: "2017-09-29T23:01:00.000Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.addEntry({ response: 404, requestTime: "2017-09-29T23:01:00.000Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.addEntry({ response: 500, requestTime: "2017-09-29T23:01:00.000Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.addEntry({ response: 404, requestTime: "01:04:03" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.addEntry({ response: 500, requestTime: "Mon Aug 03 12:45:00" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.addEntry({ response: undefined, requestTime: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("reset", () => {
    let inst

    beforeEach(() => {
        inst = new session({ name: "Michael", persistence: "UNLOCK TABLES;" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.reset()
        }
    
        expect(callFunction).not.toThrow()
    })
})
