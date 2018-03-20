# version 0.6

FROM ruby:2.4.2

RUN gem install rails \
  && gem install puma

# Get latest nodejs PPA and other repos
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
  && apt-get install -y nodejs \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install -y yarn build-essential chrpath libssl-dev libxft-dev libfreetype6 libfreetype6-dev libfontconfig1 libfontconfig1-dev \
    iceweasel \
    xvfb \
    bzip2 \
    qt5-default \
    libqt5webkit5-dev \
    gstreamer1.0-plugins-base \
    gstreamer1.0-tools \
    gstreamer1.0-x

RUN apt-get install -y gconf2

# install chrome binary
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list

RUN apt-get update && apt-get install --no-install-recommends -y google-chrome-stable

RUN export CHROME_BIN=/usr/bin/google-chrome
