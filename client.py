import socket

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to a specific address and port
server_socket.bind(('localhost', 9000))

# Listen for incoming connections
server_socket.listen(1)

# Accept a connection from a client
client_socket, address = server_socket.accept()

# Open the client file for writing
with open('client_data.txt', 'w') as client_file:
    # Receive and write the data to the client file
    while True:
        data = client_socket.recv(1024).decode()
        if not data:
            break
        client_file.write(data + '\n')

# Close the client file
client_file.close()

# Close the client socket
client_socket.close()

# Close the server socket
server_socket.close()
