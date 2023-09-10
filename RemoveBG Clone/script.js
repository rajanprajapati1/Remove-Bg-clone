const hero_section =  document.querySelector('.hero-section');
const processing_image_Section =  document.querySelector('.processing_image_Section');
const main_upload_page = document.querySelector('.main_upload_page');
const UploadInput = document.getElementById("upload");
const Uploadbtn = document.querySelectorAll(".upload_btn");
const process_nav = document.querySelectorAll('.process_nav>span')
const originalimag = document.getElementById("after");
const RemovedBackgroundImage = document.getElementById("before")
const API_KEY_REMOVE_BG = 'JkssDLVwZAMNDBVJ9aSjsgsT';
const url = 'https://api.remove.bg/v1.0/removebg';
const dowloadlink = document.getElementById("dowloadbtn");
process_nav.forEach((val,index)=>{
    val.addEventListener("click",()=>{
        
        process_nav.forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        if(index === 0 ){
            originalimag.style.display = "block";
            RemovedBackgroundImage.style.display = "none";
            val.classList.add("active");
        }if(index === 1 ){
            originalimag.style.display = "none";
            RemovedBackgroundImage.style.display = "block";
            val.classList.add("active");
        }
        val.classList.add("active");
    })
    if(index === 0 ){
        val.classList.add("active");
    }

})

function openinput(){
    UploadInput.click();
}
document.addEventListener('DOMContentLoaded', function() {
  
UploadInput.addEventListener('change', (event) => {

    const file = event.target.files[0];

    const reader = new FileReader();
    const formData = new FormData();

    formData.append('image_file', file);
    formData.append('size', 'auto');
    reader.onload = function() {
        const imageData = reader.result;
        originalimag.src = imageData;
        fetch(url, {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY_REMOVE_BG
            },
            body: formData
        })
        .then(response => response.blob())
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            const resultImage = new Image();
            resultImage.src = objectURL;
    
            RemovedBackgroundImage.src = objectURL;
            dowloadlink.href = objectURL;
        })
        processing_image_Section.style.display = "flex";
    hero_section.style.display = "none";
    main_upload_page.style.display = "none";
    }
    

    reader.readAsDataURL(file);
});
});

document.addEventListener('DOMContentLoaded', function() {
Uploadbtn.forEach((btn)=>{
   btn.addEventListener("click",()=>{
    hero_section.style.display = "none";
    main_upload_page.style.display = "flex";
  openinput();

   })
})

})
