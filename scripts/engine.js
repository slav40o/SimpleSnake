(function(){
    var backDrawer = new Drawer('back-canvas');
    var actionDrawer = new Drawer('act-canvas');
    var statsDrawer = new Drawer('stats-canvas');

    var snake = new Snake(actionDrawer);
    snake.setSpeed(4);
    generateEvents();

    function anim(){
        snake.move();

        requestAnimationFrame(anim);
    }

    anim();

    var bonus = new Bonus(100, 100);
    bonus.draw(actionDrawer);

    var rock = new Rock(100, 200);
    rock.draw(actionDrawer);

    function generateEvents(){
        window.addEventListener('keydown', function (e) {
            var key = e.which;
            //Prevent reverse gear
            if (key == "37" && snake.getDirX() != 1) {
                snake.setDirection(-1, 0);
            }
            else if (key == "38" && snake.getDirY() != 1) {
                snake.setDirection(0, -1);
            }
            else if (key == "39" && snake.getDirX() != -1) {
                snake.setDirection(1, 0);
            }
            else if (key == "40" && snake.getDirY() != -1) {
                snake.setDirection(0, 1);
            }
        })
    }
}());
