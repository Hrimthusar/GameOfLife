var btn;
var value;

function start(n,m,btnSize,border) {

    if(n<15)
        n=15;
    if(m<15)
        m=15;
    if(btnSize<15)
        btnSize=15;

    var mouseDown = false;
    document.body.onmousedown = function() {
      mouseDown = true;
    }
    document.body.onmouseup = function() {
      mouseDown = false;
    }

    function createHandlerOver( i,j ) {
      return function() {
        over( i,j );
      }
    }

    function createHandlerClick( i,j ) {
      return function() {
        click( i,j );
      }
    }

    function over(i,j){
        if(mouseDown){
            click(i,j);
        }
    }

    function click(i,j){
        if(value[i][j]==0){
            $(btn[i][j]).addClass("alive");
            value[i][j] = 1;
        } else {
            $(btn[i][j]).removeClass("alive");
            value[i][j] = 0;
        }
    }

    if(border == true)
        var borderSize=2;
    else
        var borderSize=0;

    var width = (borderSize+Number(btnSize))*n;
    var height = (borderSize+Number(btnSize))*m;

    var maxHeight = window.innerHeight - $("#in-header").outerHeight() -
                    $("#next").outerHeight() - $("#footer").outerHeight();

    if (height>maxHeight)
        var sb = getScrollBarWidth();
    else
        sb = 0;

    var map = document.getElementById("map");

    map.setAttribute("style","width:"+width+"px;height:"+(borderSize+Number(btnSize))*m+"px;max-height:"+maxHeight+"px;padding-right:"+0+"px;");

    width+=sb;

    if(width < window.innerWidth)
        document.getElementById("next").setAttribute("style","width:"+width+"px;");
    else
        document.getElementById("next").setAttribute("style","width:100%");

    if(width < window.innerWidth)
        document.getElementById("in-game-wrapper").setAttribute("style","width:"+(width+2)+"px;left:"+ (window.innerWidth - width - 2)/2+"px");
    else
        document.getElementById("in-game-wrapper").setAttribute("style","width:100%");
    $(map).addClass("map");

    $("#map-container").css("max-height",maxHeight+"px");
    $("#map-container").css("width",(width+1)+"px");

    btn = new Array(n);
    value = new Array(n);
    for(var i=0; i<m; i++){
        btn[i] = new Array(m);
        value[i] = new Array(m);
        for(var j=0; j<n; j++){
            value[i][j] = 0;

            btn[i][j] = document.createElement("div");
            btn[i][j].setAttribute("class", "btn");
            if(border)
               $(btn[i][j]).addClass("border");
            btn[i][j].setAttribute("style","width:"+btnSize+"px;height:"+btnSize+"px");

            map.appendChild(btn[i][j]);

            btn[i][j].onmouseover = createHandlerOver( i,j );
            btn[i][j].onmousedown = createHandlerClick( i,j );
        }
    }
    $("#next").slideDown(300);
    $("#next-fix").show("slow");
    $("#speed").show();
}

function step(n,m){
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            if(born(i,j,n,m)){
                value[i][j] = value[i][j] == 0 ? 2 : 3;
            } else {
                value[i][j] = value[i][j] == 0 ? -2 : -1;
            }
        }
    }
}

function wasAlive(i,j){
    if(value[i][j]==1 || value[i][j]==3 || value[i][j]==-1)
        return true;
    return false;
}

function isAlive(i,j){
    if(value[i][j]>=1 && value[i][j]<=3)
        return true;
    return false;
}

function born(i,j,m,n){

    var sum = 0;

    if(i!=0 && j!=0 && wasAlive(i-1,j-1))
        sum++;
    if(i!=0 && j!=(m-1) && wasAlive(i-1,j+1))
        sum++;
    if(i!=(n-1) && j!=0 && wasAlive(i+1,j-1))
        sum++;
    if(i!=(n-1) && j!=(m-1) && wasAlive(i+1,j+1))
        sum++;

    if(i!=0 && wasAlive(i-1,j))
        sum++;
    if(i!=(n-1) && wasAlive(i+1,j))
        sum++;
    if(j!=0 && wasAlive(i,j-1))
        sum++;
    if(j!=(m-1) && wasAlive(i,j+1))
        sum++;

    if(wasAlive(i,j) && sum>=2 && sum<=3)
        return true;
    else if(!wasAlive(i,j) && sum==3)
        return true
    return false;
}

function stepColor(n,m){
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            if(isAlive(i,j)){
                $(btn[i][j]).addClass("alive");
                value[i][j] = 1;
            } else {
                $(btn[i][j]).removeClass("alive");
                value[i][j] = 0;
            }
        }
    }
}

function setRadius(n,m){

    $(".map").css("background-color", "#ccc");
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            if(value[i][j]==0){
                $(btn[i][j]).removeClass('radius-top-left');
                $(btn[i][j]).removeClass('radius-top-right');
                $(btn[i][j]).removeClass('radius-bottom-left');
                $(btn[i][j]).removeClass('radius-bottom-right');
            } else {
                $(btn[i][j]).removeClass("hide");
                if(i!=0 && j!=0 && !isAlive(i,j-1) && !isAlive(i-1,j)){
                    $(btn[i][j]).addClass('radius-top-left');
                } else {
                    $(btn[i][j]).removeClass('radius-top-left');
                }

                if(i!=0 && j!=(n-1) && !isAlive(i,j+1) && !isAlive(i-1,j)){
                    $(btn[i][j]).addClass('radius-top-right');
                } else {
                    $(btn[i][j]).removeClass('radius-top-right');
                }

                if(i!=(m-1) && j!=0 && !isAlive(i+1,j) && !isAlive(i,j-1)){
                    $(btn[i][j]).addClass('radius-bottom-left');
                } else {
                    $(btn[i][j]).removeClass('radius-bottom-left');
                }

                if(i!=(m-1) && j!=(n-1) && !isAlive(i+1,j) && !isAlive(i,j+1)){
                    $(btn[i][j]).addClass('radius-bottom-right');
                } else {
                    $(btn[i][j]).removeClass('radius-bottom-right');
                }

            }
        }
    }
}

function restart(n,m){

    $(".map").css("background-color", "#ccc");
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            value[i][j]=0;
            $(btn[i][j]).removeClass('radius-top-left');
            $(btn[i][j]).removeClass('radius-top-right');
            $(btn[i][j]).removeClass('radius-bottom-left');
            $(btn[i][j]).removeClass('radius-bottom-right');
            $(btn[i][j]).removeClass("alive");
        }
    }
}

function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};
