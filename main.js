var watch = require('node-watch');
const path = require('path');
var process2 = require('child_process');

var arguments = process.argv.splice(2);
var projectPath = arguments[0];

let Main = {
    run:function() {
        console.log("开始监听ts文件修改");
        watch(projectPath + "src/", { recursive: true }, (evt, name)=> {
            console.log('%s changed.', name);
            let pathName = path.dirname(name.replace("/src/", "/bin-debug/"));
            console.log("output", pathName);
            this.shell("tsc --sourceMap --outDir " + pathName + " " + name + " || echo over");
            console.log("over");
        });
    },
	shell:function (cmd) {		
		process2.execSync(cmd,function (error, stdout, stderr) {
			if (error !== null) {
				console.log(error);
				console.log(cmd);
			}
		});
	}
}
Main.run();