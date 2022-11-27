# Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
# Unauthorized copying of this file, via any medium is
# strictly prohibited. Proprietary and confidential.

FROM node:lts

COPY package*.json ./
RUN npm install

COPY src src/

CMD ["npm", "start"]