function addName() {
    const nameofUser = prompt('กรุณากรอกชื่อ')
    document.getElementById('userName').innerHTML = nameofUser;
}

function addBook() {
    //เก็บข้อมูล
    const nameofBook = prompt('กรุณากรอกชื่อหนังสือ')
    const numberofAllPage = prompt('กรุณากรอกจำนวนหน้าทั้งหมด')

    //บอกตำแหน่ง
    const positionInTable = document.querySelector('#table-list')

    //ดึงข้อมูลจากตำแหน่งนั้นๆ
    const numberoflistbook = positionInTable.rows.length

    //สร้างข้อมูลใหม่
    const addNewListBook = positionInTable.insertRow(numberoflistbook);
    addNewListBook.id = `item-${numberoflistbook}`
    addNewListBook.className = 'list-book'

    //เปลี่ยนโค้ดใหม่
    const newcodeHTML = `<tr>
    <td class="bookname">${nameofBook}</td>
    <td class="readpage">0</td>
    <td class="allpage">${numberofAllPage}</td>
    <td>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 0%;"
                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
        </div>
    </td>
    <td><button class="btn update" onclick="updateProgress('item-${numberoflistbook}')">Update</button></td>
</tr>`;
    //เพิ่มโค้ดใหม่ใน HTML
    addNewListBook.innerHTML = newcodeHTML;
    overviewProgress();
}


function updateProgress(id) {
    // บอกตำแหน่งของข้อมูลที่จะไปดึงมาก่อนคำนวณ
    const positionIDInHtml = document.querySelector(`#${id}`);
    const positionDataReadpage = positionIDInHtml.querySelector(`.readpage`);
    const positionDataProgress = positionIDInHtml.querySelector(`.progress-bar`);
    const positionDataAllpage = positionIDInHtml.querySelector(`.allpage`);
    const positionBtn = positionIDInHtml.querySelector(`.btn`);

    //เริ่มเก็บข้อมูลใหม่ และเตรียมค่าต่างๆ เพื่อคำนวณ หรือที่จะไปทดแทน
    positionDataReadpage.innerHTML = prompt('คุณอ่านหนังสือถึงหน้าไหนแล้ว?');
    const dataofAllpage = positionDataAllpage.innerHTML;
    const numberofReadpage = positionDataReadpage.innerHTML;

    //นำข้อมูลมาคำนวณ
    const updateReadProgress = ((numberofReadpage * 100) / dataofAllpage)

    //แทรกข้อมูลใหม่ Progress Bar
    positionDataProgress.style.width = `${updateReadProgress}%`
    positionDataProgress.innerHTML = `${updateReadProgress}%`
    positionDataProgress.className = `progress-bar ${updateReadProgress >= 100 ? 'bg-success' : 'bg-info'}`

    //แทรกข้อมูลใหม่ ปุ่ม
    positionBtn.innerHTML = `${updateReadProgress >= 100 ? 'review' : 'update'}`;
    positionBtn.className = `btn ${updateReadProgress >= 100 ? 'review' : 'update'}`;
    overviewProgress();
}

function overviewProgress() {
    // บอกตำแหน่งของข้อมูลที่จะไปดึงมาก่อนคำนวณ
    const positionOverview = document.querySelector(`.all-progress .progress-bar`);
    const allProgress = document.querySelectorAll(`.list-book .allpage`);
    const allRead = document.querySelectorAll(`.list-book .readpage`);


    //เริ่มเก็บข้อมูลใหม่ สำหรับหน้าทั้งหมด และหน้าที่อ่านไป
    const numoflist = allProgress.length;
    let sumAll = 0
    let sumread = 0

    for (i = 0; i < numoflist; i++) {
        let valueAll = parseInt(allProgress[i].innerHTML)
        sumAll = sumAll + valueAll;
        let allsumread = parseInt(allRead[i].innerHTML)
        sumread = sumread + allsumread;
    }

    //คำนวณความคืบหน้า
    const calOverviewRead = ((sumread * 100) / sumAll)

    //อัพเดท Progress
    positionOverview.innerHTML = `${calOverviewRead.toFixed(2)}%`
    positionOverview.style.width = `${calOverviewRead.toFixed(2)}%`

    //อัพเดทแถบ
    positionOverview.className = `progress-bar ${calOverviewRead >= 100 ? 'bg-success' : ''}`

}

function saveData() {
    alert('save แล้ว');
    // บอกตำแหน่งของข้อมูล
    const positionurl = 'https://script.google.com/macros/s/AKfycbweVdS_8iTQ_yhvA71Y8Ai2-hlXNBb1Gwt9be_-vLLxE6jIZCifOI7VDUeL700afVXJ/exec'
    //ดึงตำแหน่งข้อมูล
    const allbook = document.querySelectorAll(`.list-book`)

    //เก็บข้อมูล
    const saveBookName = []
    const saveCurrentPage = []
    const saveAllPage = []
    console.log(allbook)
    for (i = 0; i < allbook.length; i++) {
        saveBookName.push([allbook[i].querySelector('.bookname').innerHTML])
        saveCurrentPage.push([allbook[i].querySelector('.readpage').innerHTML])
        saveAllPage.push([allbook[i].querySelector('.allpage').innerHTML])

        positionurl = `https://script.google.com/macros/s/AKfycbweVdS_8iTQ_yhvA71Y8Ai2-hlXNBb1Gwt9be_-vLLxE6jIZCifOI7VDUeL700afVXJ/exec?bookname=${saveBookName}&allpage=${saveAllPage}&currentpage=${saveCurrentPage}`
    }
    console.log(booksum)
    console.log(positionurl)

}

function run() {
    addName();
    overviewProgress();
}
run();

const scriptURL = 'https://script.google.com/macros/s/AKfycbwxrr9gY3hHl86SuG0uv8nQa0NJHnmqFYqzCzrqM0w4wWDuE-B--j9r9iwch5FHZK6o/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})