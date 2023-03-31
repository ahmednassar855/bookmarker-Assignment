var bookMarkName = document.getElementById("bookMarkName");
var websSiteUrl = document.getElementById("websSiteUrl");

function bookMarkValidationName(){
    var bookMarkNameRegex = /^[A-Z][a-z]{3,20}$/ig; 
    return bookMarkNameRegex.test(bookMarkName.value);
}

function websSiteUrlValidation(){
    var webSiteRegex = /^[A-Z][a-z]{3,20}$/ig; 
    return webSiteRegex.test(websSiteUrl.value);
}

var bookMarks = [];

if( localStorage.getItem("bookMarks") !=null ){
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    display();
}

function addBookMarks(){
    if (bookMarkValidationName() && websSiteUrlValidation()){
        var bookMark = {
            siteName : bookMarkName.value.trim(),
            webSite : websSiteUrl.value
        };
        console.log(bookMark);
        bookMarks.push(bookMark);
    
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
        clearDataFrom();
        display();   
    }
    else{
        window.alert("Enter First Character capital only , enter char at least 3 chat and max 20 char")
    }
     
}

function clearDataFrom(){
    bookMarkName.value = "";
    websSiteUrl.value = "";
}

function display(){
    var cartoona = "";
    for( var i = 0 ; i < bookMarks.length ; i++ ){
        cartoona = cartoona + `
        <tr >
            <td> ${i+1} </td>
            <td> ${bookMarks[i].siteName} </td>
            <td> ${bookMarks[i].webSite} </td>
            <td>
                <a id="anchor" href="https://www.${bookMarks[i].webSite}.com"> <button class="btn btn-outline-success" > Visit </button> </a>
            </td>
            <td> <button  id="addEdit" class="btn btn-outline-danger" onclick="updateBookMark(${i})">Update </button> </td>
            <td> <button class="btn btn-outline-warning" onclick="deleteBookMark(${i})">Delete </button> </td>
    
            </tr> 
        `;
    }
    document.getElementById("tableData").innerHTML = cartoona;
}

function deleteBookMark(index){
    bookMarks.splice(index , 1);
    display();
}

function updateBookMark(index){

    document.getElementById("addEdit").innerHTML = `
    <button id="addEdit" onclick="editBookMark(${index})" class="btn btn-warning">Edit BookMark</button>`
    bookMarks.slice(index , index +1);
    bookMarkName.value = bookMarks[index].siteName;
    websSiteUrl.value = bookMarks[index].webSite;
}

function editBookMark(index){
    var editBookMark = {
        siteName : bookMarkName.value,
        webSite :websSiteUrl.value
    }

    bookMarks.splice(index , 1 , editBookMark);
    localStorage.setItem("bookMarks" , JSON.stringify(bookMarks));

    clearDataFrom();
    display(); 

    document.getElementById("addEdit").innerHTML = `
    <button id="addEdit" onclick="addProduct()" class="btn btn-success"> Submit </button>`
}



