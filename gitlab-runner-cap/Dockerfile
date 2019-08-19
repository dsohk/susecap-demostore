FROM ubuntu:18.04

RUN apt-get update

RUN export PATH=$PATH:/sbin && \
    apt-get install -y curl sudo nodejs npm  ca-certificates wget curl nano git libwww-perl libjson-perl libterm-readkey-perl zip openjdk-8-jdk && \
    apt-get clean

# Install GitLab Runner
RUN wget -q -O "/usr/local/bin/gitlab-runner" "https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64" && \
    chmod +x "/usr/local/bin/gitlab-runner" && \
    useradd --comment "GitLab Runner" --create-home "gitlab-runner" --shell "/bin/bash" && \
    sudo usermod -a -G sudo gitlab-runner && \
    echo "GitLab Runner successfully installed"

# Preserve runner's data
# VOLUME ["/etc/gitlab-runner", "/home/gitlab-runner"]

# init sets up the environment and launches gitlab-runner
COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["run", "--working-directory=/home/gitlab-runner", "--user=gitlab-runner"]
