$(function() {
  $("#update").on('click', function(event) {
    var repo = $("#repo").val();
    $.ajax({
      url: "https://api.github.com/repos/" + repo + "/commits",
      success: function( data ) {
        $("#commits-header").append(repo).show();
        $("#commits-list").html("");
        $.each(data, function(index, commit) {  
          $("#commits-list").append( "<div class=\"commit\">");        
          $("#commits-list").append("<br />sha: "+commit.sha);
          $("#commits-list").append("<br />author email: "+commit.commit.author.email);
          $("#commits-list").append("<br />commit message: "+commit.commit.message);
          $("#commits-list").append("<br />date of commit: "+commit.commit.author.date);
          $("#commits-list").append("</div>");
          if (index == 4)
            return(false);
          else
            $("#commits-list").append("<hr />");
        });
      }
    });
  })
})