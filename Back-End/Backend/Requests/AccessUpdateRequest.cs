namespace Backend.Requests
{
    public class AccessUpdateRequest
    {
        public string AccessName { get; set; }

        public DateTime LastModificatedDate { get; set; }

        public string CreatedBy { get; set; }
    }
}
