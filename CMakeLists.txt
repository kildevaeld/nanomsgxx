cmake_minimum_required(VERSION 3.7)
project(nnxx)

# Global settings
set(GLOBAL_OUTPUT_PATH ${PROJECT_BINARY_DIR}/bin)

# Sets global output directory for single configuration (GCC)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})

# Sets global output directory for sub-configurations (msvc, mingw)
foreach(OUTPUTCONFIG ${CMAKE_CONFIGURATION_TYPES})
    string(TOUPPER ${OUTPUTCONFIG} OUTPUTCONFIG)
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_${OUTPUTCONFIG} ${GLOBAL_OUTPUT_PATH})
    set(CMAKE_LIBRARY_OUTPUT_DIRECTORY_${OUTPUTCONFIG} ${GLOBAL_OUTPUT_PATH})
    set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY_${OUTPUTCONFIG} ${GLOBAL_OUTPUT_PATH})
endforeach(OUTPUTCONFIG CMAKE_CONFIGURATION_TYPES)

option(NNXX_STATIC_LIB "Build static library instead of shared library." OFF)

include(cmake/StaticNanoMsgSource.txt)

if (NNXX_STATIC_LIB)
    add_definitions (-DNNXX_STATIC_LIB)
    include(cmake/StaticNanoMsgSource.txt)
else()
	#include(cmake/DynamicNanoMsgSource.txt)
endif ()

link_directories(${GLOBAL_OUTPUT_PATH})

add_subdirectory(src)
