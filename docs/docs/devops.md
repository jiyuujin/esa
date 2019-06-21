# DevOps

DevOpsとは、 Development (開発) と Operation (運用) を密接に連携することで、柔軟かつスピーディに開発を進めること。

## Node.js環境構築

### nodenvインストール

Node.jsを使うため、 [nodenv](https://github.com/nodenv/nodenv)を採用します。

```bash
# nodenv
git clone https://github.com/nodenv/nodenv.git ~/.nodenv
cd ~/.nodenv && src/configure && make -C src

# node-build
git clone https://github.com/nodenv/node-build.git $(nodenv root)/plugins/node-build
```

.bash_profileで nodenvを使えるよう設定します。

```bash
export PATH="$HOME/.nodenv/bin:$PATH"
eval "$(nodenv init -)"
```

### Node.jsインストール

インストールできるバージョンを事前に確認、実際にインストールします。

```bash
nodenv install -l
nodenv install 10.14.2
nodenv global 10.14.2
nodenv rehash
node -v
```

インストールに時間がかかります、これは待つしか無さそう。。

## PHP環境構築

[【技術メモ】PHP、Rubyを使って開発を遂行するための構築手順書](https://webneko.dev/posts/the-guide-in-development-of-script-languages)

### phpenvインストール

PHPを使うため、 [phpenv](https://github.com/phpenv/phpenv)を採用します。

```bash
# phpenv
git clone https://github.com/CHH/phpenv.git
cd phpenv/bin
./phpenv-install.sh

git clone https://github.com/CHH/php-build.git ~/.phpenv/plugins/php-build
```

.bash_profileで phpenvを使えうよう設定します。

```bash
export PATH="$HOME/.phpenv/bin:$PATH"
eval "$(phpenv init -)"
```

### PHPインストール

::: warning 色々と入れないとダメみたいで辛い。。
PHPをビルドするため必要なパッケージをインストールします。

```bash
# bison
brew search bison
```

bisonをインストール後、パスを設定します。

```bash_profile
echo 'export PATH="/usr/local/opt/bison@2.7/bin:$PATH"'
```

re2cをインストールします。

```bash
# re2c
brew install re2c
```

libmcryptをインストールします。

```bash
# libmcrypt
brew install libmcrypt
```

libxml2をインストールします。

```bash
# libxml2
brew install libxml2
```

libxml2をインストール後、パスを設定します。

```.bash_profile
echo 'export PATH="/usr/local/opt/libxml2/bin:$PATH"'
```

autoconfをインストールします。

```bash
# autoconf
brew install autoconf
```

automakeをインストールします。

```bash
# automake
brew install automake
```
:::


インストールできるバージョンを事前に確認、実際にインストールします。

```bash
phpenv install --list
phpenv install 7.2.13
phpenv global 7.2.13
phpenv rehash
php -v
```

インストールに時間がかかります、これは待つしか無さそう。。

### Composerインストール

作業ディレクトリに移動します (私の場合はホームディレクトリより projectを作成しています)

```bash
git clone https://github.com/ngyuki/phpenv-composer.git ~/.phpenv/plugins/phpenv-composer
composer --version
```

## Python環境構築

[【技術メモ】Python3を使って Discord Botを作成するための構築手順書](https://webneko.dev/posts/the-guide-in-development-of-discord-bot-by-python3)

### pyenvインストール

Pythonを使うため、 pyenvを採用します。

```bash
# pyenv
brew install pyenv
```

.bash_profileで pyenvを使えうよう設定します。

```bash
export PYENV_ROOT=${HOME}/.pyenv
if [ -d "${PYENV_ROOT}" ]; then
    export PATH=${PYENV_ROOT}/bin:$PATH
    eval "$(pyenv init -)"
fi
```

インストールできるバージョンを事前に確認、実際にインストールします。

```
pyenv install -l
pyenv install 3.7.3
pyenv global 3.7.3
pyenv versions
python -v
```

#### zlibエラーで pyenvのインストールに失敗した

xcode-selectの最新バージョンに Mojave用の MacOS SDK headerがデフォルトで入っていないことが原因。マニュアルで以下の通りインストールする必要あります。

```bash
sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /
```
