import re
import glob
import os
import sys
import string


def words_in_file(filename):
    res = []

    with open(filename, encoding='utf-8', mode='r') as f:
        file_text = f.read()
        words = re.findall("(\s*)(contract\(\'|it\(\'|describe\(\')(.*?)\'", file_text)
        for word in words:
            res.append(word);
    f.close()
    return res


def words_in_folder(folder_path, file_extension):
    result_list = []
    for filename in glob.glob(os.path.join(folder_path, f'**/*.{file_extension}'), recursive=True):
        print(f'Found file {filename}')
        for word in words_in_file(filename):
            result_list.append(word)
    return result_list


if len(sys.argv) >= 2:
    path = sys.argv[1]
else:
    path = input('Scrivi il percorso dentro cui cercare RICORSIVAMENTE i test:')

if os.path.isdir(path):
    print(f'Looking for .test.js files in {path}')
    results = words_in_folder(path, 'test.js')
    if len(results) > 0:
        out_file = open('tests.sql', 'w+')
        for i in range(0, len(results) - 1):
            out_file.write(results[i][0] + results[i][2] + "\n")
        out_file.close()
        print('File generato')
    else:
        print(f'No .test.js files found in {path}')
else:
    print(f'{path} is not a directory! Exiting')