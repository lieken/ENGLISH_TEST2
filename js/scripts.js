/*!
    * Start Bootstrap - Creative v6.0.3 (https://startbootstrap.com/themes/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
    */

    //禁止右鍵
    function stop(){
      return false;
    }
    document.oncontextmenu=stop;
    //檢測作答
     function testuser(){
      var i= document.getElementById('numberValue');
      var t= document.getElementById('nameValue');
      if (i.value==""||t.value=="")
      {
      alert("請輸入學號或姓名")
      location.replace("#about")
      return false;
      }
      else
      {
        let ansValue1 = document.querySelector('#answerValue1').value;
        if (ansValue1==""){
        $("#clockdiv").show();
        const deadline = new Date(Date.parse(new Date()) +  1 *  30* 60 * 1000);
  
        initializeClock('clockdiv', deadline);
        location.replace("#test1");
        return false;
        }
  
  
      return true;
      }
      }
  
      (function($) {
    "use strict";
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 72)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 75
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-scrolled");
      } else {
        $("#mainNav").removeClass("navbar-scrolled");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Magnific popup calls
    $('#portfolio').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
      }
    });
  
  })(jQuery); // End of use strict
  
  //發音控制
  var synth = window.speechSynthesis;
  let sendButton = document.getElementById("speakans");
  function speakans(speakid) {
    var msg = new SpeechSynthesisUtterance(speakid);
    let voices =synth.getVoices();
  
    for(let index = 0; index < voices.length; index++) {
      if(voices[index].name == "Google US English"){       
        msg.voice = voices[index];
        msg.rate = 0.6;
        break;
      }else{
        //如果沒有則使用預設中文語音
        msg.lang = 'en-US';
        msg.rate = 0.6;
      }
    }
    window.speechSynthesis.cancel();
    setTimeout(function speaka(){ synth.speak(msg)}, 1000);
  
  };
  
  //答案傳送 1~5
  let sendansButton = document.getElementById("answer");
  function send(QuestionArray) {
    let name = document.querySelector('#nameValue').value;
    let number = document.querySelector('#numberValue').value;
    if (testuser()){
    let Question = QuestionArray;
    //題目答案
    var AtArray = new Array(); 
    var AaArray = new Array(5); 
    var AbArray = new Array(5); 
    var AcArray = new Array(5); 
    var AdArray = new Array(5); 
    var AeArray = new Array(5); 
    for(var a=0;a<1;a++){
      AtArray=[AaArray,AbArray,AcArray,AdArray,AeArray];};
      var mistake = 0;
    for(var f = 0; f < 5; f++) {
        //製作0= (改)題目
        //製作1= (改)學生答案
        //製作2= 分數
        //製作3= (原)題目
        //製作4= (原)學生答案
        var a = f + 1 
        var algebra = '#answerValue' + a;
        var ansvalue = document.querySelector(algebra).value;
        AtArray[4][f] = ansvalue
        ansvalue = ansvalue.replace("?"," ?").replace("."," .").replace(/,/g," ,")
        
        var NewArray = new Array();
        var NewArray = ansvalue.split(" ");
        AtArray[0][f] = Question[3][f];
        AtArray[1][f] = NewArray;
        var ansCounter = AtArray[0][f].length;
        var saCounter = AtArray[1][f].length;
        var acounter = ansCounter //代理製作:相同長度的陣列
        var score = 0;
  
        //製作相同長度的陣列
        while(acounter>0){
          if (saCounter<ansCounter){
            ct=ansCounter-saCounter
            for(var z=0;z<ct;z++){
              AtArray[1][f][saCounter+z]=''
            }
          }
          acounter--;
        }
        for(var i = 0; i < ansCounter; i++) {
          if(AtArray[0][f][i]==AtArray[1][f][i]){
            score = score+1;
            AtArray[1][f][i] = "Gd"
          }
  
          if(AtArray[0][f][i]!==AtArray[1][f][i]){
            for(s = 0; s< ansCounter;s++){
              if(AtArray[0][f][i]==AtArray[1][f][s]){
                score = score+1;
                AtArray[1][f][s] = "Gd"
              }
            }
  
          }
  
        }
        
        AtArray[2][f] = score
        mistake = mistake + (ansCounter-score)
        console.log(mistake) 
        AtArray[3][f] = Question[1][f];
        
      };
      console.log(AtArray) 
      var Score = 0
      for(var f = 0; f < 5; f++) {
         Score = Score + AtArray[2][f]
       }
    
    Score = Score.toString()+ ' 分';
    mistake = '錯 '+mistake.toString()+ ' 個字';
  
    $.ajax({
      type:"GET",
      url: "https://script.google.com/macros/s/AKfycbyCwunFLOquDQ1nj8FYEFmHeBvJeiXzbCD3DhsK9BmjrycZh28/exec",
      data: {
          "type": "1",
          "name": name,
          "number": number,
          "mistake": mistake,
          "Score": Score,
          "ansValue1": AtArray[4][0],
          "quesValue1": AtArray[3][0],
          "ansValue2": AtArray[4][1],
          "quesValue2": AtArray[3][1],
          "ansValue3": AtArray[4][2],
          "quesValue3": AtArray[3][2],
          "ansValue4": AtArray[4][3],
          "quesValue4": AtArray[3][3],
          "ansValue5": AtArray[4][4],
          "quesValue5": AtArray[3][4],
      },
      success: function(response) {
        alert("作答完畢");
        //window.close();
      },
      error: function(){alert("失敗！")}
    });
  }else{
  }
  
  };
  
  //發音次數 1~5
  $(document).ready(function() { 
  $('#1').click(function() {
    QuestionArray[2][0] = QuestionArray[2][0]-1;
    if(QuestionArray[2][0]==0){
    $('#1').hide();}
    else if(QuestionArray[2][0]==1){
      $('#1').text("剩一次 !")
    }
    //console.log(QuestionArray[2][0])
  });
  $('#2').click(function() {
    QuestionArray[2][1] = QuestionArray[2][1]-1;
    if(QuestionArray[2][1]==0){
    $('#2').hide();}
    else if(QuestionArray[2][1]==1){
      $('#2').text("剩一次 !")
    }
  });
  $('#3').click(function() {
    QuestionArray[2][2] = QuestionArray[2][2]-1;
    if(QuestionArray[2][2]==0){
    $('#3').hide();}
    else if(QuestionArray[2][2]==1){
      $('#3').text("剩一次 !")
    }
  });
  $('#4').click(function() {
    QuestionArray[2][3] = QuestionArray[2][3]-1;
    if(QuestionArray[2][3]==0){
    $('#4').hide();}
    else if(QuestionArray[2][3]==1){
      $('#4').text("剩一次 !")
    }
  });
  $('#5').click(function() {
    QuestionArray[2][4] = QuestionArray[2][4]-1;
    if(QuestionArray[2][4]==0){
    $('#5').hide();}
    else if(QuestionArray[2][4]==1){
      $('#5').text("剩一次 !")
    }
  });
  }); 
  
  
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  //控制倒數
  function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    //const daysSpan = clock.querySelector('.days');
    //const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
   
    function updateClock() {
      const t = getTimeRemaining(endtime);
      //console.log(t.total) 
      if(t.total == 0){
        alert("時間到!趕快交卷!");
      }
      //daysSpan.innerHTML = t.days;
      //hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
  