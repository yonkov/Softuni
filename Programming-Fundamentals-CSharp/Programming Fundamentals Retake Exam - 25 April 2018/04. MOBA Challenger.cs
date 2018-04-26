using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task_4
{
    class Program
    {
        static void Main(string[] args)
        {
            //dictionary with all the players
            Dictionary<string, Dictionary<string, long>> players = new Dictionary<string, Dictionary<string, long>>();
            //helper list with all the players
            List<string> playersList = new List<string>();
            string input = Console.ReadLine();

            while (input!="Season end")
            {
                if (input.Contains("->"))
                {
                    string[] inputParams = input
                    .Split(new string[] { " -> " },
                    StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                    string player = inputParams[0];
                    string position = inputParams[1];
                    long skill = long.Parse(inputParams[2]);
                    //If there is no such player in the dictionary
                    if (!players.ContainsKey(player))
                    {
                        //add player, position and skill
                        players.Add(player, new Dictionary<string, long>());
                        players[player].Add(position, skill);
                        //add player to the list with players
                        playersList.Add(player);
                    }
                    //If such player exists
                    else
                    {
                        //if there is no such position, add the position and skill
                        if (!players[player].ContainsKey(position))
                        {
                            players[player].Add(position, skill);
                        }
                        else
                        {
                            //if there is such position, add the skill only if the new skill points are bigger than the stored points
                            long oldSkill = players[player][position];
                            if (oldSkill<skill)
                            {
                                players[player][position] = skill;
                            }
                        }
                    }
                }
                if (input.Contains("vs"))
                {
                    string[] inputParams = input
                    .Split(new string[] { " vs " },
                    StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                    string player1 = inputParams[0];
                    string player2 = inputParams[1];
                    //if the players exist
                    if (playersList.Contains(player1) && playersList.Contains(player2))
                    {
                        long skillFirstDict = 0;
                        long skillSecondDict = 0;
                        //check whether there is a dublicated position for both players
                        foreach (var kvpFirstDict in players[player1])
                        {
                            foreach (var kvpSecondDict in players[player2])
                            {
                                //if there is dublicated key position
                                if (kvpFirstDict.Key==kvpSecondDict.Key)
                                {
                                    // calculate total skill points for the two players
                                    skillFirstDict = players[player1].Values.Sum();
                                    skillSecondDict = players[player2].Values.Sum();                                
                                }
                            }
                        }
                        //Remove one of the two players on the basis of their skill points
                        if (skillFirstDict > skillSecondDict)
                        {
                            players.Remove(player2);
                            playersList.Remove(player2);
                        }
                        else if (skillFirstDict < skillSecondDict)
                        {
                            players.Remove(player1);
                            playersList.Remove(player1);
                        }
                    }
                }
                input =Console.ReadLine();
            }
            //Print the result ordered descending by skillpoints and then by player name in ascending order
            foreach (var kvp in players.OrderByDescending(x=>x.Value.Values.Sum()).ThenBy(x=>x.Key))
            {
                Console.WriteLine("{0}: {1} skill", kvp.Key,kvp.Value.Values.Sum());
                foreach (var position in kvp.Value.OrderByDescending(x=>x.Value).ThenBy(x=>x.Key))
                {
                    Console.WriteLine("- {0} <::> {1}", position.Key, position.Value);
                }
            }
        }
    }
}
