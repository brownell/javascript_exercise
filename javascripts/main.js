var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(document).ready(function(){
  $("section h1, section h2").each(function(){
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $("nav ul li:first-child a").parent().addClass("active");
  });
  
  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();    
  });
  
  sectionHeight();
  
  $('img').load(sectionHeight);

  $("#update").on('click', function(event) {
    var repo = $("#repo").val();
    $.ajax({
      url: "https://api.github.com/repos/" + repo + "/commits",
      success: function( data ) {
        $("#commits-header").html("<br />Recent Commits for: ");
        $("#commits-header").append(repo).show();
        $("#commits-list").html("");
        $.each(data, function(index, commit) {  
          $("#commits-list").append( "<div class=\"commit\">");        
          $("#commits-list").append("<br />sha: "+commit.sha);
          $("#commits-list").append("<br />author email: "+commit.commit.author.email);
          $("#commits-list").append("<br />commit message: "+commit.commit.message);
          $("#commits-list").append("<br />date of commit: "+commit.commit.author.date);
          $("#commits-list").append("</div>");
          if (index == 3)
            return(false);
        });
      }
    });
  })
});

fixScale = function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }
};