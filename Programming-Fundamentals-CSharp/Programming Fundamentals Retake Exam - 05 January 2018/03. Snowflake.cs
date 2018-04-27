using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SnowFlake
{
    class Program
    {
        static void Main(string[] args)
        {
            Regex surface = new Regex(@"^[^a-zA-Z\d]+$");
            Regex mantle = new Regex(@"^[\d_]+$");
            Regex core = new Regex(@"^([^a-zA-Z\d]+)([\d_]+)([a-zA-Z]+)([\d_]+)([^a-zA-Z\d]+)$");
            List<Regex> snowflake = new List<Regex>() { surface, mantle, core, mantle, surface };
            int counter = 1;
            int coreLength = 0;
            bool isSnowflake = true;

            foreach (Regex reg in snowflake)
            {
                string input = Console.ReadLine();
                if (!reg.Match(input).Success)
                {
                    isSnowflake = false;
                }
                if (counter==3)
                {
                    coreLength = reg.Match(input).Groups[3].Value.Length;
                }
                counter++;
            }
            if (isSnowflake == true)
            {
                Console.WriteLine("Valid");
                Console.WriteLine(coreLength);
            }
            else
            {
                Console.WriteLine("Invalid");
            }
        }
    }
}
