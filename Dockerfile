FROM ratneshraval/cals-base:0.6

ENV APP_HOME /cals
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ENV DISPLAY :1
ENV BUNDLE_PATH /ruby_gems
