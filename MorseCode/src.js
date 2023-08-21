function show_dash () {
    led.plot(2, 2)
    led.plot(1, 2)
    led.plot(3, 2)
    basic.pause(500)
    led.unplot(2, 2)
    led.unplot(1, 2)
    led.unplot(3, 2)
}
function show_dot () {
    led.plot(2, 2)
    basic.pause(500)
    led.unplot(2, 2)
}
function show_output (output: string) {
    basic.pause(300)
    basic.showString(output)
}
let ref: StringMap = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};
function decode_morse (morseCode: string) {
    return morseCode
            .split('   ')
            .map(
                a => a
                    .split(' ')
                    .map(
                        b => ref[b]
                    ).join('')
            ).join(' ')
}
let output = ""
let input_stream_split: string[] = []
let input_stream = ""
let doing_thing = true
basic.forever(function () {
    while (doing_thing) {
        if (input.logoIsPressed()) {
            input_stream = "" + input_stream + " "
        }
        if (input.pinIsPressed(TouchPin.P2)) {
            break;
        }
        if (input.buttonIsPressed(Button.A)) {
            input_stream = "" + input_stream + "."
            show_dot()
        } else if (input.buttonIsPressed(Button.B)) {
            input_stream = "" + input_stream + "-"
            show_dash()
        }
    }
    input_stream_split = input_stream.split(" ")
    for (let i = 0; i <= input_stream_split.length - 1; i++) {
        output = "" + output + decode_morse(input_stream_split[i])
    }
    serial.writeLine(input_stream)
    serial.writeLine(output)
    show_output(output)
    input_stream = ""
})
