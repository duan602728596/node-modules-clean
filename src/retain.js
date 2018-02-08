/* 删除关键文件和文件夹 */

// 文件
const file: string[] = ['license', '.npmignore', 'package-lock.json', 'yarn.lock', '.yarn-integrity', '.gitignore'];
// 扩展名
const ext: string[] = ['.md', '.txt', '.markdown'];

module.exports = {
  file,
  ext
};