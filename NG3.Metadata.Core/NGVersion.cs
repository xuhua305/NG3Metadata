using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core
{
    [Serializable]
    public class NGVersion
    {
        public NGVersion()
        {

        }

        public NGVersion(int major, int minor, int build, int revision)
        {
            Major = major;
            Minor = minor;
            Build = build;
            Revision = revision;
        }

        public NGVersion(string versionStr)
        {
            string[] versionArray = versionStr.Split('.');
            if (versionArray.Length == 4)
            {
                Major = Convert.ToInt32(versionArray[0]);
                Minor = Convert.ToInt32(versionArray[1]);
                Build = Convert.ToInt32(versionArray[2]);
                Revision = Convert.ToInt32(versionArray[3]);
            }
        }

        public int Major { get; set; }

        public int Minor { get; set; }

        public int Build { get; set; }

        public int Revision { get; set; }

        public void NextMajor()
        {
            NextMajor(1);
        }

        public void NextMajor(int step)
        {
            Major += step;
        }

        public void NextMinor()
        {
            NextMinor(1);
        }

        public void NextMinor(int step)
        {
            Minor += step;
        }

        public void NextBuild()
        {
            NextBuild(1);
        }

        public void NextBuild(int step)
        {
            Build += step;
        }

        public void NextRevision()
        {
            NextRevision(1);
        }

        public void NextRevision(int step)
        {
            Revision += step;
        }

        public override string ToString()
        {
            return string.Format("{0}.{1}.{2}.{3}", Major, Minor, Build, Revision);
        }
    }
}
