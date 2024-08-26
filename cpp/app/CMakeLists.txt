cmake_minimum_required(VERSION 3.20)

# Define the project name and where to report bugs.
set(PACKAGE_BUGREPORT
    "https://github.com/GoogleCloudPlatform/cpp-samples/issues")
project(cpp-samples-cloud-run-hello-world CXX)

find_package(functions_framework_cpp REQUIRED)
find_package(Threads)

add_executable(cloud_run_hello cloud_run_hello.cc)
target_compile_features(cloud_run_hello PRIVATE cxx_std_17)
target_link_libraries(cloud_run_hello functions-framework-cpp::framework)

include(GNUInstallDirs)
install(TARGETS cloud_run_hello RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR})