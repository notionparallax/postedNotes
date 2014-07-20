import random, string

def randCode(length):
    return ''.join(random.choice(string.hexdigits) for n in xrange(length))

codeLength = 6
peopleAU = ["Cathrine"
            ]

peopleGB = ["Charlie",
            "Seb",
            "Paul", #Y
            "",
            "",
            "",
            "",
            ""]
nameCodeList=[]

for name in peopleAU:
    print
    print "for:",name
    #Posted Notes
    #0 NAMe
    #1 Personal or Gift
    #2 index as number
    #3 region AU or GB
    #4 random hex
    code = "PN{0}{1}{2}{3}{4}"
    fourCodes = "\n".join([
				 "I might have gone on about this already to you, but Irina and I made a bit of a web-service-thing that lives at http://postedNot.es"
				 ,"It is a way to send hand written letters to people, without needing to get all the bits in one place. I've explained it better on the actual website I think."
				,"We need two things, people to test it, and for more people to know about it. We figured that the best way to do that was to get people to use it. So... here's some codes that'll get you a free letter. There's 2 for you to use, and 2 for you to give away to another 2 people. Because we need to test the whole process, you need to go through the whole thing and pay your $5, but once it's done I'll issue you a refund. (This also stops people from banging in the same code over and over)"
				,""
				,"Codes for you:"
				,"    {}"
				,"    {}"
				,"and these ones are for you to give away:"
				,"    {}"
				,"    {}"
				,""
				,"You use these by just adding them to the end of the address after the postcode. Don't worry, the code won't show up on the letter."
				,"If you have any thoughts or ideas about how to make it better then let me know. If you like it then tell other people about it!"
				])
    p1 = code.format(name[0:3].upper(),"P",1,"AU",randCode(codeLength))
    p2 = code.format(name[0:3].upper(),"P",1,"AU",randCode(codeLength))
    g1 = code.format(name[0:3].upper(),"G",1,"AU",randCode(codeLength))
    g2 = code.format(name[0:3].upper(),"G",1,"AU",randCode(codeLength))
    nameCodeList.append([name, p1, p2, g1, g2])
    print fourCodes.format(p1, p2, g1, g2)

print "\n\n\n\n\n"
print nameCodeList