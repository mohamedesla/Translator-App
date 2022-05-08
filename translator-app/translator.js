const fromText = document.querySelector(".from-text")
 toText = document.querySelector(".to-text")
const selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag,id) =>{
   for(const country_code in countries){
       //select English as FROM language and HIndi as TO language
       let selected;
       if(id == 0 && country_code == "en-GB"){
           selected = "selected";
       }else if(id == 1 && country_code == "ar-SA"){
           selected = "selected";
       }
       let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
       tag.insertAdjacentHTML("beforeend",option); //adding option tag inside select tag
}});

exchangeIcon.addEventListener("click",() => {
    //exchanging textarea and select tag values
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value  = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value  = tempText;
    selectTag[1].value = tempLang;

});

translateBtn.addEventListener("click" , ()=>{
    let text = fromText.value;
    translateFrom = selectTag[0].value,//getting from select tag value
    translateTo = selectTag[1].value;// getting to select tag value

   let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
   fetch(apiUrl).then(res => res.json()).then(data => {
       console.log(data);
       toText.value = data.responseData.translatedText; 
   });
});

icons.forEach(icon => {
    icon.addEventListener("click" , ({target})=>{
       if(target.classList.contains("fa-copy")){
           if(target.id == "from"){
               navigator.clipboard.writeText(fromText.value)

           }else{
            navigator.clipboard.writeText(toText.value)
           }
       } else {
           let utterance;
           // if clicked icon has from id, speak the fromTextarea else speak toTextarea value
        if(target.id == "from"){
            utterance = new SpeechSynthesisUtterance(fromText.value)
             utterance.lang = selectTag[0].value; // setting utterance language to fromSelect tag value
        } else {
            utterance = new SpeechSynthesisUtterance(toText.value)
            utterance.lang = selectTag[1].value; // Setting utterance language to toSelect tag value
        }
        speechSynthesis.speak(utterance); //Speak the passed utterance
    }
    })
})