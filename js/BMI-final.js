
//擷取DOM位置
let submitBtn = document.querySelector('.submitBtn');
let BMIresult = document.querySelector('.BMIresult');
let list = document.querySelector('.list');
var data= JSON.parse(localStorage.getItem("BMIList")) || [];
var inputheight = document.getElementById('inputheight')
var inputweight = document.getElementById('inputweight')
var btnParent = document.getElementById('btnDiv')

//建立監聽
submitBtn.addEventListener('click',calculateBMI)

//設定資料及變數
function calculateBMI(){
    //設定變數並計算BMI
    let height = Number(document.getElementById('inputheight').value)/100
    let weight = Number(document.getElementById('inputweight').value)
    var BMIvalue = weight/(height*height)
    BMIvalue=BMIvalue.toFixed(2);
    //設定顯示區將呈現的資料：顏色、狀態、當前時間
    var color;
    var BMIstatus;
    switch(true) {
        case BMIvalue <= 18.5:
            BMIstatus = "過輕";
            color = "#31baf9";
            break;
        case 18.5 < BMIvalue && BMIvalue <=25:
            BMIstatus = "理想"
            color = "#86d73f";
            break;
        case 25 < BMIvalue && BMIvalue <=30:
            BMIstatus = "過重";
            color = "#ff982d";
            break;
        case 30 < BMIvalue && BMIvalue <=35:
            BMIstatus = "輕度肥胖";
            color = "#ff6c03";
            break;
        case 35 < BMIvalue && BMIvalue <=40:
            BMIstatus = "中度肥胖";
            color = '#ff6c03';
            break;
        case  40 < BMIvalue:
            BMIstatus = "重度肥胖"
            color = "#ff1200";
            break;
        
        default:
        alert('身高或體重輸入錯誤');
        break;
    }

    //獲得當前時間
    var today = new Date();
    var currentDate = 
    `${today.getFullYear()}/${(today.getMonth())+1}/${today.getDate()}`;

    //將計算結果存入一個物件中
    const BMIdata = {
        BMI:BMIvalue,
        BMIstatus: BMIstatus,
        height: height,
        weight: weight,
        currentDate: currentDate,
        color: color
    };
    
    //新增資料並儲存在資料庫
    data.push(BMIdata);
    localStorage.setItem('dataList',JSON.stringify(data));
    //渲染畫面
    showResult(data)
    // //點擊計算BMI按鈕後，測量結果顯示於右邊按鈕區塊
    btnReset(BMIdata)
}

//渲染BMI顯示主畫面
function showResult(items){
    var str = "";
for(let i = 0; i < items.length; i++) {
    str += `
    <div data-index=${i} class="result mb-3 m-auto d-flex justify-content-between align-items-center" style="border-left:5px solid ${data[i].color};">
    <div class="col-md-2 text-start"><span class="inside">${items[i].BMIstatus}</span></div>
    <div class="col-md-2 d-flex align-items-center"><span class="title">BMI</span><span class="inside">${items[i].BMI}</span></div>
    <div class="col-md-2 d-flex align-items-center"><span class="title">weight</span><span class="inside">${items[i].height*100}</span></div>
    <div class="col-md-2 d-flex align-items-center"><span class="title">heright</span><span class="inside">${items[i].weight}</span></div>
    <div class="col-md-2 d-flex align-items-center"><span class="title">${items[i].currentDate}</span></div>
    </div>`;
}
list.innerHTML = str;   
}

function btnReset(items){

//取得按鈕的父元素將addBtn移除
btnParent.removeChild(submitBtn);

//設定顯示結果結果並加入HTML裡
var str =`
    <div class="BMIresult col-md-6 text-center p-4" style="color:${items.color}; border-color:${items.color}"> 
        <p style="font-size: 1.5rem;">${items.BMI}</p>
        <p style ="font-size: 0.75rem; color:${items.color}"">BMI</p>
        <a style="background-color:${items.color}; href="#" class="undo"><img src="img/icons_loop.png"></a>
    </div>
    <div class="showstatus d-flex align-items-center p-4 col-md-6">
        <p style="font-size: 1.5rem; color:${items.color}">${items.BMIstatus}</p>
    </div>
`
btnParent.innerHTML = str;

 //監聽重新計算的按鈕
 btnParent.addEventListener('click',calculate)
}

//重新計算BMI 
function calculate(e){
if(e.target.nodeName !== "IMG" && e.target.nodeName !=="A" ){return}
    else {
        var BMIresult = document.querySelector('.BMIresult')
        var showstatus = document.querySelector('.showstatus')
        inputheight.value = '';
        inputweight.value = '';
        btnParent.removeChild(BMIresult);
        btnParent.removeChild(showstatus);
        btnParent.appendChild(submitBtn);
    };
}
