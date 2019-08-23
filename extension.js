// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const exec = require('child_process');
const jsonfile = require('jsonfile');
var isWing = false;

/**
 * @param {vscode.ExtensionContext} context
 */

function activate() {
	let rootPath = '';
	let wing = null;
	if (vscode.workspace.workspaceFolders) {
		rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
	} else {
		isWing = true;
		wing = require('wing');
		rootPath = vscode.workspace.rootPath;
	}
	let head = isWing?wing:vscode;
	if (rootPath) {
		let list = fs.readdirSync(rootPath);
		if (list.indexOf('.wing') != -1) {
			console.log(rootPath);
			let watcher = head.workspace.createFileSystemWatcher(rootPath + '/src/**/*.ts');
			watcher.onDidChange((url) => {
				console.log('onDidChange');
				if (url.fsPath.indexOf('.ts') != -1) {
					let callback = function () {
						head.window.showInformationMessage('Egret Fast Debug: 编译完成');
					}
					changeFile(rootPath, url.fsPath, callback);
				}
			});
			watcher.onDidCreate((url) => {
				console.log('onDidCreate');
				if (url.fsPath.indexOf('.ts') != -1) {
					let callback = function () {
						head.window.showInformationMessage('Egret Fast Debug: 编译完成');
					}
					createFile(rootPath, url.fsPath, callback);
				}

				// shell(url.fsPath,()=>{
				// 	head.window.showInformationMessage(path.basename(url.fsPath) + '编译完成');
				// })
				// writeManifest(url.fsPath);
			});
			watcher.onDidDelete((url) => {
				console.log('onDidDelete');
				if (url.fsPath.indexOf('.ts') != -1) {
					let callback = function () {
						head.window.showInformationMessage('Egret Fast Debug: 删除成功');
					}
					delFile(rootPath, url.fsPath, callback);
				}

			});
			head.window.showInformationMessage('Egret Fast Debug: 加载成功');
		}


	}

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {

}

function shell(rootPath, fsPath, cb) {
	let outPath = path.dirname(fsPath).replace(path.join(rootPath, 'src'), path.join(rootPath, 'bin-debug'));
	let tsc = path.join(__dirname, './node_modules/typescript/bin/tsc');
	if(isWing){
		tsc = tsc.replace('Application Support','Application\\ Support');
	}
	console.log(tsc);
	exec.exec(`${tsc} --sourceMap --outDir ${outPath} ${fsPath}`, function () {
		if (cb) cb();
	})
	//exec.execSync(`${tsc} --sourceMap --outDir ${outPath} ${fsPath}`);

}

function changeFile(rootPath, fsPath, cb) {
	shell(rootPath, fsPath, cb);
}

function createFile(rootPath, fsPath, cb) {
	let list = fs.readdirSync(rootPath);
	if (list.indexOf('manifest.json') != -1) {
		shell(rootPath, fsPath, cb);
		let manifestPath = path.join(rootPath, 'manifest.json');
		let temp = fsPath.replace(path.join(rootPath, 'src'), 'bin-debug');
		let newContent = temp.replace('.ts', '.js');
		//console.log(newContent);
		jsonfile.readFile(manifestPath, function (err, data) {
			if (err) throw err;
			data.game.push(newContent);
			jsonfile.writeFile(path.join(rootPath, 'manifest.json'), data, { spaces: 2 }, function (err) {
				if (err) throw err;
			})
		})
	} else {
		vscode.window.showInformationMessage('未找到manifest.json,请先在wing中编译项目');
	}

}

function delFile(rootPath, fsPath, cb) {
	let list = fs.readdirSync(rootPath);
	if (list.indexOf('manifest.json') != -1) {
		let fireName = path.basename(fsPath).replace('.ts', '');
		let outPath = path.dirname(fsPath).replace(path.join(rootPath, 'src'), path.join(rootPath, 'bin-debug'));
		//console.log(path.join(outPath,fireName+'.js'),path.join(outPath,fireName+'.js.map'));
		fs.unlinkSync(path.join(outPath, fireName + '.js'));
		fs.unlinkSync(path.join(outPath, fireName + '.js.map'));
		let manifestPath = path.join(rootPath, 'manifest.json');
		let temp = fsPath.replace(path.join(rootPath, 'src'), 'bin-debug');
		let newContent = temp.replace('.ts', '.js');
		//console.log(newContent);
		let data = jsonfile.readFileSync(manifestPath);
		data.game = data.game.filter(item => item != newContent);
		jsonfile.writeFileSync(path.join(rootPath, 'manifest.json'), data, { spaces: 2 })
		cb()
	} else {
		vscode.window.showInformationMessage('未找到manifest.json,请先在wing中编译项目');
	}

}

module.exports = {
	activate,
	deactivate
}
