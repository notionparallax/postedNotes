inputText = "Item Number 1 , message_part_1: Hi pig, ~|You're a stinker.~|Love~|~|The monkey , message_part_2: , message_part_3: , message_part_4: , address_part_1: Ben Doherty~|Level 11~|255 Pitt St~|Sydney~|2000 , address_part_2: agreed:true"

import re

message,address = inputText.split(", address_part_1: ")
# print "split",message,address

message = re.sub("Item Number 1 ","", message)
messageLines = re.sub(", message_part_\d: ","",message).split("~|")
for s in messageLines:
	print s.strip()
print

address = re.sub(", address_part_2: ","", address)
address = re.sub("agreed:true","", address)
addressLines = re.sub(", message_part_\d:","",address).split("~|")
for s in addressLines:
	print s.strip()