//blinking tap to play heading
let h3=document.querySelector("h3");
let blink=true;
setInterval(()=>{
    h3.style.color=blink? "whitesmoke":"black";
    blink=!blink;
},400)

//game start
h3.addEventListener("click",function(){
    this.style.display="none";
    random_color();
    flash_seq(game_seq);
})
//----------------------------------------------------
let color_ids=["red","yellow","blue","pink"];
let game_seq=[];
let user_seq=[];
let allbtns=document.querySelectorAll(".inner");
let score=0;
let footer=document.querySelector(".foot")


//------------------------------------------------------
function flash_seq(sequence){
    for(let i=0;i<sequence.length;i++){
        setTimeout(() => {
            flash_singlebutton(sequence[i])
        }, i*600);
    }
    
}
function flash_singlebutton(random_flash_id){
    let random_color=document.getElementsByClassName(random_flash_id);
    random_color[0].classList.add("flash");
    setTimeout(()=>{
        random_color[0].classList.remove("flash")
    },300)
}
function random_color(){
    user_seq=[];   //emptying the user array before generationg new random color 
    let random_color_id=color_ids[Math.floor(Math.random()*4)];
    game_seq.push(random_color_id);
    //console.log(game_seq);
}
//--------------------------------------------------------
function flash_singlebutton_user(random_flash_id){
    let random_color=document.getElementsByClassName(random_flash_id);
    random_color[0].classList.add("userflash");
    playSound("boxflash");
    setTimeout(()=>{
        random_color[0].classList.remove("userflash")
    },300)
}

for(btn of allbtns){
    btn.addEventListener("click",btnpress)
}
function btnpress(){
    flash_singlebutton_user(this.getAttribute("id"));
    playSound("flashbox");
    user_seq.push(this.getAttribute("id"))
    //console.log(user_seq);

    matching(user_seq.length-1);
}

function matching(idx){
    if(game_seq[idx]==user_seq[idx]){
        if(game_seq.length==user_seq.length){
            score++;
            footer.innerText=`Score : ${score}`
            random_color();
            setTimeout(()=>flash_seq(game_seq),1000);
        }
    }
    else{
        playSound("gameover");
        alert(`OOPS WRONG !!!!! and your Score is ${score}`);
        location.reload();
    }
}

//sound function
function playSound(type) {
    let audio;
    if (type === "gameover") {
        audio = new Audio("sounds/gameover.wav");
    } else {
        audio = new Audio("sounds/boxflash.wav");
    }
    audio.play();
}
