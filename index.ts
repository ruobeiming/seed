import { Command } from 'commander';
import * as Git from 'nodegit';
import * as path from 'path';
const program = new Command();
import { existsSync } from 'fs';

program.option('-v, --version <version>', 'seed command version', '0.0.1');
program.option('-p, --path <path>', 'please enter git path');
program.option('-d, --dirname <dirname>', 'please enter git path');
program.parse(process.argv);

const options = program.opts();

if (options.path) {
    try {
        const new_path = path.resolve(__dirname, options.dirname || 'test');
        const exist = existsSync(new_path);
        if (exist) {
            console.warn('当前目录不为空，请删除之后重新建,文件夹地址' + new_path);
        } else {
            try {
                Git.Clone(options.path, new_path)
                    .then(res => {
                        console.log(res, ', succeed');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } catch (e) {
                console.log(e);
            }
        }
    } catch (e) {
        console.log(e);
    }
}
