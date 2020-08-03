'use strict';

$(document).ready(init);

function init() {
    renderPortfolioGrid();
}

function renderPortfolioGrid() {

    var projects = getProjects();
    var strHTMLs = projects.map(function(proj, idx) {     
       return `<div class="col-md-3 col-sm-6 portfolio-item">
        <a class="portfolio-link" onclick="changeModalContent('${proj.id}')" data-toggle="modal" href="#portfolioModal">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${proj.imgUrl}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`
    //   <div class="col-md-1"> </div>`
    })

    $('.portfolio').html(strHTMLs.join(''));
}

function changeModalContent(projId) {
    var proj = getProjectById(projId);
    var strHTML = ` <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto" src="${proj.fullImgUrl}" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${getDateFormatted(proj.publishedAt)}</li>
                  <li>Try it <a href="${proj.projUrl}" target="_blank">here</a>!</li>
                  <!-- <li>Client: Threads</li> -->
                  <!-- <li>Category: Illustration</li> -->
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    $('.modal').html(strHTML);
}

function sendMail() {
  var sendTo = 'lielm1995@gmail.com';
  var from = $('.mail-address').val();
  var subject = $('.mail-subject').val();
  var body = $('.mail-msg').val() + '\n\n from: ' + from;
  // console.log(sendTo, from, subject, body);
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${sendTo}&su=${subject}&body=${body}&bcc=`);
 

}