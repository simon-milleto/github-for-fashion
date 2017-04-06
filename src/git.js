"use strict";





document.addEventListener("DOMContentLoaded", function(){

    /********************************************
    ******************* Git API *****************
    ********************************************/

    /*************** Authentification ****************/

    var gh = new GitHub({
       token: '61fb53361289585b8516b34b5db2866aac2f5105'
    });

    var me = gh.getUser();

    var remoteRepo = gh.getRepo('fcoadebez', 'testRepoName');

    remoteRepo.getDetails( function(err, repo) {
        console.log(repo);
    });

    remoteRepo.getContents('master', '', false, function(err, contents) {
        // expect(contents).to.be.an.array();

        contents.forEach(function(content) {
            remoteRepo.getContents('master', content.name, true, function(err, content) {
                var img = document.createElement('img');

                img.src = 'data:image/jpeg;base64,' + btoa(content);
                remoteRepo.getContents('master', content.name, false, function(err, content) {
                    getImageComposant(content, img);
                });
            });            
        });
     });

    function getImageComposant(content, img) {
        console.log(content[0]);
        var div = document.createElement('div');
        var a = document.createElement('a');

        document.body.appendChild(div);
        div.appendChild(img);
        div.appendChild(a);

        $(div).css('display', 'inline-block');
        $(div).css('width', '300px');
        $(div).css('vertical-align', 'top');
        $(img).css('width', '90%');
        $(a).text('X');
        $(a).attr('href', '#');
        $(a).css('float', 'right');

        $(a).click(function(e) {
            e.preventDefault();
            remoteRepo.deleteFile('master', content[0].name, function() {
                $(e.target).parent().remove();
            });
        });
    }

    function newImageComposant(content, a) {
        console.log(content);
        $(a).click(function(e) {
            e.preventDefault();
            remoteRepo.deleteFile('master', content.name, function() {
                $(e.target).parent().remove();
            });
        });
    }

    /********************************************
    ***************** Drag & Drop ***************
    ********************************************/

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            var start = 0;
            var stop = f.size - 1;
            var content;
            var reader = new FileReader();
            var name = f.name;
            var type = f.type;
            var size = f.size;
            var lastModifiedDate = f.lastModifiedDate;
            // If we use onloadend, we need to check the readyState.
            reader.onloadend = function(evt) {
                if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                    content = evt.target.result;
                    var n = type.indexOf('image');
                    if(n != -1) {
                        /*************** Addind file ****************/

                        remoteRepo.writeFile('master', name, content, 'image', function(err, resp) {
                            img.css('opacity', 1);
                            console.log("name1 : " + name);
                            remoteRepo.getContents('master', name, false, function(err, content) {
                                console.log(content);
                                console.log("name2 : " + name);
                                newImageComposant(content, a);
                            });
                            
                        });

                        var div = document.createElement('div');
                        var a = document.createElement('a');
                        var img = document.createElement('img');

                        document.body.appendChild(div);
                        div.appendChild(img);
                        img.after(a);

                        $(div).css('display', 'inline-block');
                        $(div).css('width', '300px');
                        $(div).css('vertical-align', 'top');
                        $(img).css('width', '90%');
                        $(a).text('X');
                        $(a).attr('href', '#');
                        $(a).css('float', 'right');
                        
                        
                        img.src = 'data:image/jpeg;base64,' + btoa(content);
                        document.body.appendChild(div);
                        div.appendChild(img);
                        img.css('opacity', 0.5);
                    }
                }
            };
            var blob = f.slice(start, stop + 1);
            reader.readAsBinaryString(blob);
        }          
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);


    /********************************************
    ******************* Git API *****************
    ********************************************/

    /*************** Authentification ****************/

    // var gh = new GitHub({
    //    token: '61fb53361289585b8516b34b5db2866aac2f5105'
    // });

    // var me = gh.getUser();

    /*************** Get User repositories ****************/

    // $('.valid').click(function() {
    //     var name = $('.name').val();
    //     var user = gh.getUser(name);

    //     if (user) {
    //         user.listRepos(function(err, repos) {
    //             if (repos) {
    //                 $('.result').append("<ul></ul>");
    //             }

    //             repos.forEach(function(repo) {
    //                 $('.result').append("<li>" + repo.name + "</li>");
    //             });
    //         });
    //     } else {
    //         alert('Utilisateur non trouvé')
    //     }
        
    // });

    /*************** Creating repository ****************/

    // const options = {
    //  name: "testRepoName",
    //  description: 'New short description',
    //  homepage: 'http://example.com',
    //  auto_init: true
 //     };

    // me.createRepo(options);

    // var remoteRepo = gh.getRepo('fcoadebez', 'testRepoName');

    // remoteRepo.getDetails( function(err, repo) {
    //     console.log(repo);
    // });

    // /*************** Addind file ****************/

    // remoteRepo.writeFile('master', 'fileName2', 'initialText', 'initialMessage', function() {});
});