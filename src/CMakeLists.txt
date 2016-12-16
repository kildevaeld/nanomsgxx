set (CMAKE_CXX_STANDARD 11)

MACRO(INSTALL_HEADERS_WITH_DIRECTORY HEADER_LIST)

    FOREACH(HEADER ${${HEADER_LIST}})
    	message(info ${HEADER})
        STRING(REGEX MATCH "(.\\\*)\\\[/\\\]" DIR ${HEADER})
        message(info ${DIR})
        INSTALL(FILES ${HEADER} DESTINATION include/${DIR})
    ENDFOREACH(HEADER)

ENDMACRO(INSTALL_HEADERS_WITH_DIRECTORY)

set(HEADERS
nnxx/bus.h
nnxx/chrono.h
nnxx/error.h
nnxx/inproc.h
nnxx/ipc.h
nnxx/message.h
nnxx/message_control.h
nnxx/message_istream.h
nnxx/message_istream.hpp
nnxx/message_iterator.h
nnxx/message_ostream.h
nnxx/message_ostream.hpp
nnxx/message_streambuf.h
nnxx/message_streambuf.hpp
nnxx/nn.h
nnxx/pair.h
nnxx/pipeline.h
nnxx/poll.h
nnxx/pubsub.h
nnxx/reqrep.h
nnxx/socket.h
nnxx/socket.hpp
nnxx/survey.h
nnxx/tcp.h
nnxx/timeout.h
nnxx/unittest.h
nanomsg/ext/nnxx_ext.h
)

set(SOURCES
nnxx/error.cpp
nnxx/message.cpp
nnxx/message_control.cpp
nnxx/message_istream.cpp
nnxx/message_iterator.cpp
nnxx/message_ostream.cpp
nnxx/message_streambuf.cpp
nnxx/nn.cpp
nnxx/poll.cpp
nnxx/pubsub.cpp
nnxx/reqrep.cpp
nnxx/socket.cpp
nnxx/survey.cpp
nnxx/tcp.cpp
nnxx/timeout.cpp
nanomsg/ext/nnxx_ext.c
)

message(info ${nanomsg_LIBRARIES})

include_directories(${GLOBAL_OUTPUT_PATH}/nanomsg/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR})
add_library(nnxx ${SOURCES})
target_link_libraries(nnxx ${nanomsg_LIBS})
add_dependencies(nnxx nanomsg)

#set_target_properties(nnxx PROPERTIES PUBLIC_HEADER ${HEADERS})
install(TARGETS nnxx 
	LIBRARY DESTINATION lib
	ARCHIVE DESTINATION lib
	)

message(info ${CMAKE_INSTALL_PREFIX})
#INSTALL_HEADERS_WITH_DIRECTORY(HEADERS)
install(DIRECTORY 
	./
	DESTINATION include
	FILES_MATCHING
	PATTERN "*.hpp" PATTERN "*.h"
	)
install(DIRECTORY ${nanomsg_INCLUDE_DIRS} DESTINATION ${CMAKE_INSTALL_PREFIX})
