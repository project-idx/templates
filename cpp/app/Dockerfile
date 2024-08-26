# We chose Alpine to build the image because it has good support for creating
# statically-linked, small programs.
FROM alpine:3.20 AS build

# Install the typical development tools for C++, and
# the base OS headers and libraries.
RUN apk update && \
    apk add \
        build-base \
        cmake \
        curl \
        git \
        gcc \
        g++ \
        libc-dev \
        linux-headers \
        ninja \
        pkgconfig \
        tar \
        unzip \
        zip

# Use `vcpkg`, a package manager for C++, to install
WORKDIR /usr/local/vcpkg
ENV VCPKG_FORCE_SYSTEM_BINARIES=1
RUN curl -sSL "https://github.com/Microsoft/vcpkg/archive/2024.04.26.tar.gz" | \
    tar --strip-components=1 -zxf - \
    && ./bootstrap-vcpkg.sh -disableMetrics

# Copy the source code to /v/source and compile it.
COPY . /v/source
WORKDIR /v/source

# Run the CMake configuration step, setting the options to create
# a statically linked C++ program
RUN cmake -S/v/source -B/v/binary -GNinja \
    -DCMAKE_TOOLCHAIN_FILE=/usr/local/vcpkg/scripts/buildsystems/vcpkg.cmake \
    -DCMAKE_BUILD_TYPE=Release

# Compile the binary and strip it to reduce its size.
RUN cmake --build /v/binary
RUN strip /v/binary/cloud_run_hello

# Create the final deployment image, using `scratch` (the empty Docker image)
# as the starting point. Effectively we create an image that only contains
# our program.
FROM scratch AS cloud-run-hello
WORKDIR /r

# Copy the program from the previously created stage and the shared libraries it
# depends on.
COPY --from=build /v/binary/cloud_run_hello /r
COPY --from=build /lib/ld-musl-x86_64.so.1 /lib/ld-musl-x86_64.so.1
COPY --from=build /usr/lib/libstdc++.so.6 /usr/lib/libstdc++.so.6
COPY --from=build /usr/lib/libgcc_s.so.1 /usr/lib/libgcc_s.so.1

# Make the program the entry point.
ENTRYPOINT [ "/r/cloud_run_hello" ]