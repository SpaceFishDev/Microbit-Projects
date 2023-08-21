function draw_ground () {
    for (let x = 0; x <= 4; x++) {
        put_pixel(x, 0)
    }
}
function show_screen () {
    enforce_fps(14)
    clear_leds()
    draw_everything()
}
function jmp () {
    last_jump += 1
    yvel = 0.6
}
function handle_cactus () {
    cactus_x += 0 - cactus_vel
    if (cactus_x < 0) {
        cactus_x = 4
        cactus_h = randint(2, 3)
        cactus_vel += 2 * (cactus_vel / 100)
        score += 1
    }
}
function float () {
    last_jump += 1
    yvel = 0
}
function draw_everything () {
    draw_player(player_x, player_y)
    draw_ground()
}
function handle_player_movement () {
    yvel = 0
    if (is_jumping && last_jump < 6) {
        jmp()
    } else if (is_jumping && last_jump < 15) {
        float()
    } else if (is_jumping && last_jump < 18) {
        fall()
    } else {
        is_jumping = false
        last_jump = 0
        yvel = -0.25
    }
}
function apply_velocity (x: number, y: number, px: number, py: number) {
    return [px + x, py + y]
}
function game_update () {
    if (player_y < cactus_h - 1 && cactus_x > 1 && cactus_x < 2) {
        death = true
    }
    player_pos = player_update(player_x, player_y, yvel, cactus_x, cactus_h)
    player_x = player_pos[0][0]
    player_y = player_pos[0][1]
    yvel = player_pos[1][0]
    handle_cactus()
}
function draw_cactus (x: number, h: number) {
    for (let index = 0; index <= h - 1; index++) {
        put_pixel(x, index)
    }
}
function fall () {
    last_jump += 1
    yvel = -0.55
}
function put_pixel (x: number, y: number) {
    // convert bottom left to be 0,0
    y = 4 - y
    led.plot(x, y)
}
function draw_player (x: number, y: number) {
    put_pixel(x, y)
    put_pixel(x, y + 1)
}
function handle_score () {
    while (true) {
        basic.pause(100)
        basic.showNumber(score)
        basic.showString(" ")
    }
}
function clear_leds () {
    for (let x2 = 0; x2 <= 4; x2++) {
        for (let y = 0; y <= 4; y++) {
            led.unplot(x2, y)
        }
    }
}
function player_update (px: number, py: number, last_yvel: number, cactus_x: number, cactus_h: number) {
    let xvel = 0
    draw_cactus(cactus_x, cactus_h)
    handle_jump(px, py, last_yvel)
    handle_player_movement()
    newpos = apply_velocity(xvel, yvel, px, py)
    if (newpos[1] <= 0) {
        newpos[1] = 1
    }
    show_screen()
    return [newpos, [yvel]]
}
function enforce_fps (fps: number) {
    ms = 1000 / fps
    if (Delta < ms) {
        basic.pause(ms - Delta)
    }
}
function is_on_ground (py: number) {
    return py <= 1
}
function handle_jump (px: number, py: number, last_yvel: number) {
    let j = handle_button(px,py,last_yvel)
if (j == true) {
        is_jumping = true
    }
}
function current_time_ms () {
    return 0.001 * input.runningTimeMicros()
}
let ms = 0
let newpos: number[] = []
let y = 0
let score = 0
let last_jump = 0
let death = false
let cactus_h = 0
let cactus_vel = 0
let cactus_x = 0
let player_x = 0
let player_y = 0
let Delta = 0
let y22 = 0
let yvel = 0
let y2 = 0
let player_pos: number[][];
let is_jumping: boolean;
is_jumping = false
is_jumping = false
let LastTime = current_time_ms()
Delta = current_time_ms() - LastTime
player_y = 3
player_x = 1
function handle_button(px: number, py: number, yvel: any): boolean {
    if (input.buttonIsPressed(Button.A)) {
        if (is_on_ground(py)) {
            is_jumping = true
            return true
        }
    }
    return false
}
cactus_x = 4
cactus_vel = 0.1
cactus_h = 2
yvel = -0.25
while (death == false) {
    game_update()
}
clear_leds()
handle_score()
