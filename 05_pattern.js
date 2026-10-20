const r = require("raylib");

function setup() {
    const WIDTH = 1024;
    const HEIGHT = 1024;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Buffer");
    r.SetTargetFPS(20);
    return { WIDTH, HEIGHT, };
}

function draw(world, target) {
    const source1 = {
        x: 0,
        y: 0,
        width: 64,
        height: 64
    };
    const source2 = {
        x: 0,
        y: 0,
        width: -64,
        height: -64
    };


    r.BeginDrawing();

    r.ClearBackground(r.DARKGRAY);
    for (let row = 0; row < 16; row++) {
        for (let col = 0; col < 16; col++) {
            const x = col * 64;
            const y = row * 64;
            const source = (row * col) % 3 === 0 ? source1 : source2;
            r.DrawTextureRec(target.texture, source, { x, y }, r.WHITE);
        }
    }


    r.EndDrawing();
}

function loop(world) {
    const target = motherTexture();

    while (!r.WindowShouldClose()) {
        draw(world, target);
    }


}

function motherTexture() {


    const target = r.LoadRenderTexture(64, 64);
    r.BeginTextureMode(target);

    r.ClearBackground(r.BLACK);
    for (let row = 0; row < 64; row++) {
        for (let col = 0; col < 64; col++) {
            r.DrawRectangle(row, col, 1, 1, row < 64 - col ? r.BLUE : r.WHITE);
        }
    }



    r.EndTextureMode();
    return target;
}

function teardown() {
    r.CloseWindow();
}


function main() {
    const world = setup();
    loop(world);
    teardown();
}

main();