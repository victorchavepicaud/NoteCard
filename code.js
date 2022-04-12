let count=0;
let name_choose="";
const name_default = document.querySelector('#name');
const error = document.querySelector('#error');
const theme = document.querySelector('.theme');
const menu = document.querySelector('.menu');
const barIcon = document.querySelector('.bar-icon');
const palette = document.querySelectorAll('.dead');
console.log(palette);
name_default.value.toUpperCase();
let pos=47;

name_default.addEventListener('keypress',(e)=>{
    if(e.which==13){
        if(name_default.value!=""){
            addElement();
        }
        else{
            error.innerHTML="Veuillez donner un nom à votre note"
        }
    }
})
creation.addEventListener('click',()=>{
    if(name_default.value!=""){
        addElement();
    }else{
        error.innerHTML="Veuillez donner un nom à votre note"
    }
})
function addElement(){
    name_choose=name_default.value
    action(count, name_choose.charAt(0).toUpperCase()+name_choose.slice(1));
    count+=1;
    name_default.value="";
    error.innerHTML="";
}

function action(count, name_choose){

    const note = document.createElement('div');
    note.innerHTML = `<div class="cube cube${count}">
    <div class="header header${count}">
        <div class="title title${count}">
            <label class="nom nom${count}">${name_choose}</label>
            <button class="remove remove${count}"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="parametres parametres${count}">
            <select class="font font${count}">
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
            <!-- <button class="bold bold${count}" name="red">B</button>
             <button class="italic italic${count}">I</button>
             <button class="underline underline${count}">U</button> -->
            <button class="color color${count} blue blue${count}" value="blue"></button>
            <button class="color color${count} red red${count}" value="red"></button>
            <button class="color color${count} black black${count}" value="black"></button>
            <button class="color color${count} green green${count}" value="green"></button>
        </div>
    </div>
    <div class="text">
        <textarea class="textarea textarea${count}" spellcheck="false" name="textarea" placeholder="Vous pouvez écrire ici"></textarea>
    </div>
    </div>`;


    const header = note.querySelector('.header');
    const title = note.querySelector('.title'+count);
    const label = note.querySelector('.nom'+count);
    const cube = note.querySelector('.cube'+count);
    const textarea = note.querySelector('.textarea'+count);
    const font = note.querySelector('.font'+count);
    const color = note.querySelectorAll('.color'+count);
    const remove = note.querySelector('.remove'+count);
    const icon = note.querySelector('.fa-solid');
    console.log(theme);

    pos+=2;
    cube.style.top=pos+"%";
    cube.style.left=pos+"%"

    let x_div;
    let y_div;
    let permi=false;

    title.addEventListener('mousedown', (e)=>{
        if(e.target!=label && e.target!=icon){
            x_div = e.offsetX;
            y_div = e.offsetY;
            permi=true;
        }
    });

    header.addEventListener('mouseup', ()=>{
        permi=false;
    });

    window.addEventListener('mousemove', (e)=>{
        if(permi==true){
            cube.style.margin = 0;
            cube.style.top=0;
            cube.style.left=0;
            cube.style.transform = "translate(0%,0%)";
            cube.style.left = (e.pageX-x_div)+"px";
            cube.style.top = (e.pageY-y_div)+"px";
            console.log(e);
        }
        if(e.target===menu || e.target===barIcon || e.target===palette){
            permi=false;
        }
        
    })

    font.addEventListener('change', ()=>{
        textarea.style.fontSize = font.value+"px";
    })

    color.forEach(element => {
        element.addEventListener('click', ()=>{
            textarea.style.color = element.value;
        })
    });

    remove.addEventListener('click', ()=>{
        note.remove();
    });

    document.body.appendChild(note);
}

const btn = document.querySelector('.bar-icon');

btn.addEventListener('click', ()=>{
    theme.classList.toggle('newpos');
})

const img = document.querySelectorAll('.img');

img.forEach(element =>{
    element.addEventListener('click', ()=>{
        document.body.style.background = "url("+element.src+") fixed center/cover";
    })
});
const color_theme = document.querySelectorAll('.colortheme');

color_theme.forEach(element=>{
    element.addEventListener('click', ()=>{
        document.documentElement.style.setProperty("--color_header", element.value+"1)");
        document.documentElement.style.setProperty("--color_background", element.value+"0.815)");
        document.documentElement.style.setProperty("--color_palette", element.value+"0.89)");
        document.documentElement.style.setProperty("--color_font", element.name);
    })
});