clang -fmodules -fsyntax-only -Xclang -ast-dump llvm.cpp | sed "s,\x1B\[[0-9;]*m,,g" > data/tree.txt